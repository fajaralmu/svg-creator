
import UserService from './UserService';
import MasterDataService from './MasterDataService'; 
import ReportService from './ReportService';
export default class Services {
    userService: UserService = UserService.getInstance();
    masterDataService: MasterDataService = MasterDataService.getInstance(); 
    reportService: ReportService = ReportService.getInstance();
}