import { useAuth } from "@/hooks/useAuth";

export default function HomePage() {
  const { data: user } = useAuth();
  if(!user) return null;
  return (
    <>
      <p>Welcome <span className="font-bold">{user.fullname}</span></p>
    </>
  );
}