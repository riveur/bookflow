CREATE OR REPLACE PROCEDURE send_notification_to_user(IN user_id UUID, IN message VARCHAR) AS $$
BEGIN
    -- Insérez l'entrée dans la table notifications
    INSERT INTO notifications ("date", "message", "user_id")
    VALUES (NOW(), message, user_id);
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION check_example_availability() RETURNS trigger AS $$
    DECLARE
        target_example RECORD;
		error_message VARCHAR(255);
	BEGIN
		
		SELECT examples.id AS id, examples.available AS available, examples.book_id AS book_id, books.title AS book_title
		INTO target_example 
		FROM examples 
		INNER JOIN books ON books.isbn = examples.book_id
		WHERE examples.id = NEW.example_id;
		
		IF target_example.available = false THEN
			error_message := FORMAT(E'Le livre %s que vous avez essayer d\'emprunter n\'est pas disponible', target_example.book_title);
			CALL send_notification_to_user(NEW.user_id, error_message);
			RAISE NOTICE 'Exemplaire indisponible';
			RETURN NULL;
		END IF;
		
		RETURN NEW;
	END;
$$ LANGUAGE plpgsql;

-- Avant d'insérer la transaction on vérifie si l'exemplaire est disponible
CREATE TRIGGER trigger_before_insert_transaction
BEFORE INSERT
ON transactions
FOR EACH ROW
EXECUTE PROCEDURE check_example_availability();

CREATE OR REPLACE FUNCTION change_example_availability() RETURNS trigger AS $$
	BEGIN
		IF NEW.status = 'EMPRUNTE' THEN
			UPDATE examples SET available = false WHERE id = NEW.example_id;
		ELSIF NEW.status = 'RENDU' THEN
			UPDATE examples SET available = true WHERE id = NEW.example_id;
		END IF;
		RETURN NEW;
	END;
$$ LANGUAGE plpgsql;

-- Après l'insertion ou la mise à jour d'une transaction on change la disponibilité de l'exemplaire
CREATE TRIGGER trigger_after_insert_or_update_transaction
AFTER INSERT OR UPDATE
ON transactions
FOR EACH ROW
EXECUTE PROCEDURE change_example_availability();

-- Permet de récupèrer la date du dernier emprunt
CREATE OR REPLACE FUNCTION get_last_active_transaction_by_book_isbn(IN isbn_value VARCHAR) 
RETURNS TABLE (
	title VARCHAR,
	author VARCHAR,
	category VARCHAR,
	date transactions.date%TYPE
) AS $$
	BEGIN
		RETURN QUERY SELECT books.title AS title, authors.name AS author, categories.name AS category, transactions.date AS date
		FROM transactions
		INNER JOIN examples ON examples.id = transactions.example_id
		INNER JOIN books ON examples.book_id = books.isbn
		INNER JOIN authors ON books.author_id = authors.id
		INNER JOIN categories ON books.category_id = categories.id
		WHERE 
			books.isbn = isbn_value AND 
			transactions.real_return_date IS NULL AND
			transactions.status = 'EMPRUNTE'
		ORDER BY transactions.date DESC
		LIMIT 1;
	END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION get_expired_transactions() RETURNS SETOF transactions AS $$
	BEGIN
		RETURN QUERY SELECT * FROM transactions 
		WHERE 
			transactions.real_return_date IS NULL AND
			transactions.expected_return_date < NOW()::date;
	END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION check_transactions_status() RETURNS INT AS $$
	DECLARE
		transac RECORD;
		book RECORD;
		count_user INT := 0;
	BEGIN
		FOR transac IN (SELECT * FROM get_expired_transactions())
		LOOP
			UPDATE transactions SET status = 'ATTENTE_RETOUR' WHERE id = transac.id;
			SELECT * INTO book FROM books WHERE isbn = (SELECT examples.book_id FROM examples WHERE examples.id = transac.example_id);
			CALL send_notification_to_user(
				transac.user_id, 
				FORMAT(
					E'Vous avez atteint la limite de la date d\'emprunt du livre %s (%s), rendez-le au plus vite.', 
					book.title, 
					transac.expected_return_date
				)
			);
		END LOOP;
		SELECT COUNT(t.user_id) INTO count_user FROM get_expired_transactions() AS t;
		RETURN count_user;
	END;
$$ LANGUAGE plpgsql;