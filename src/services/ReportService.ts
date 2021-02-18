
export default class ReportService {

    private static instance?: ReportService;

    static getInstance(): ReportService {
        if (this.instance == null) {
            this.instance = new ReportService();
        }
        return this.instance;
    }


}