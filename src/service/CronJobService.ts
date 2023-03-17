import {CronJob} from 'cron';
import AccountCharacterService from './AccountCharacterService';

export default class CronJobService {

    public static start() {
        this.recoveryLifeJob();
        this.secondJob();
    }

    private static recoveryLifeJob() {
        new CronJob('0 */1 * * * *', async () => await AccountCharacterService.recoveryLife()).start();
    }

    private static secondJob() {
        new CronJob('0 */2 * * * *', () => console.log('ok')).start();
    }
}