 
import { contextPath } from '../constant/Url';
import { commonAjaxPostCalls } from './Promises'; 
import HealthCenter from './../models/HealthCenter';
import Filter from '../models/common/Filter';
import WebRequest from '../models/common/WebRequest';
export default class InventoryService {
    getAvailableProducts = (productCode: string, location:HealthCenter) => {
        const endpoint = contextPath().concat("api/app/inventory/availableproducts/"+productCode)
        return commonAjaxPostCalls(endpoint, {
            healthcenter: location
        });
    }

    getProductsInHealthCenter = (filter:Filter, location:HealthCenter) => {
        const endpoint = contextPath().concat("api/app/inventory/getproducts")
        return commonAjaxPostCalls(endpoint, {
            healthcenter: location,
            filter: filter
        });
    }
    adjustStocks = () => {
        const endpoint = contextPath().concat("api/app/inventory/recalculatestock")
        return commonAjaxPostCalls(endpoint, {  });
    }
    getInventoriesData = () => {
        const endpoint = contextPath().concat("api/app/inventory/getinventoriesdata")
        return commonAjaxPostCalls(endpoint, {  });
    }
    getProductUsage = (request: WebRequest) => {
        const endpoint = contextPath().concat("api/app/inventory/getproductusage")
        return commonAjaxPostCalls(endpoint, request);
    }
    getProductListWithUsage = (filter: Filter) => {
        const endpoint = contextPath().concat("api/app/inventory/getproductswithusage")
        return commonAjaxPostCalls(endpoint, {filter:filter});
    }
    private static instance?: InventoryService;

    static getInstance(): InventoryService {
        if (this.instance == null) {
            this.instance = new InventoryService();
        }
        return this.instance;
    }
     

}