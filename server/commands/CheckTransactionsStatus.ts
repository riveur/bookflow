import { BaseCommand } from '@adonisjs/core/build/standalone'
import Database from '@ioc:Adonis/Lucid/Database'

export default class CheckTransactionsStatus extends BaseCommand {
  /**
   * Command name is used to run the command
   */
  public static commandName = 'check:transactions_status'

  /**
   * Command description is displayed in the "help" output
   */
  public static description = ''

  public static settings = {
    /**
     * Set the following value to true, if you want to load the application
     * before running the command. Don't forget to call `node ace generate:manifest`
     * afterwards.
     */
    loadApp: true,

    /**
     * Set the following value to true, if you want this command to keep running until
     * you manually decide to exit the process. Don't forget to call
     * `node ace generate:manifest` afterwards.
     */
    stayAlive: false,
  }

  public async run() {
    const result = await Database.rawQuery('SELECT check_transactions_status()')
    this.logger.info(`${result.rows[0].check_transactions_status} utilisateurs ont été notifiés`)
  }
}
