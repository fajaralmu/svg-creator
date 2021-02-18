
import Filter from '../models/common/Filter';
import WebRequest from '../models/common/WebRequest';
import { contextPath } from './../constant/Url';
import { commonAjaxPostCalls, commonAjaxPostCallsWithBlob } from './Promises';
import BaseEntity from './../models/BaseEntity';
import ManagementProperty from '../models/ManagementProperty';
import EntityProperty from '../models/settings/EntityProperty';
import ApplicationProfile from './../models/ApplicationProfile'; 

export default class MasterDataService {
  
    managementProperties: ManagementProperty[] = [];
    private entityPropertyMap: Map<string, EntityProperty> = new Map(); 
    private static instance?: MasterDataService;

    static getInstance(): MasterDataService {
        if (this.instance == null) {
            this.instance = new MasterDataService();
        }
        return this.instance;
    }

    getProductByCode = (code: string) => {
        return this.getByKey('product', 'code', code);
    }
    getProductsByName = (name:string) => {
        return this.getRecordsByKeyLike("product", "name", name);
    }
    setEntityProperty(code: string, data?: EntityProperty) {
        if (!data) {
            return;
        }
        this.entityPropertyMap.set(code, data);
    }
    getEntityProperty(code?: string): EntityProperty | undefined {
        if (code == undefined) {
            return undefined;
        }
        return this.entityPropertyMap.get(code);
    }

    loadManagementProperties(req?: any) {
        const endpoint: string = contextPath().concat("api/app/entity/managementpages");
        return commonAjaxPostCalls(endpoint, {});

    }
    loadEntityProperty(code: string) {
        console.debug("Load entity prop: ", code);
        const request: WebRequest = {
            entity: code
        }
        const endpoint: string = contextPath().concat("api/app/entity/configv2");
        return commonAjaxPostCalls(endpoint, request);

    }
    loadHealthCenters = () => {
        const request: WebRequest = {
            entity: 'healthcenter', filter: { orderBy: 'name', orderType: 'asc' }
        }
        const endpoint: string = contextPath().concat("api/app/entity/get");
        return commonAjaxPostCalls(endpoint, request);
    }
    loadEntities(request: WebRequest) {
        const endpoint: string = contextPath().concat("api/app/entity/get");
        return commonAjaxPostCalls(endpoint, request);

    }
    loadAllEntities(code: string) {
        const request: WebRequest = {
            entity: code,
            filter: {
                limit: 0, page: 0
            }
        }
        const endpoint: string = contextPath().concat("api/app/entity/get");
        return commonAjaxPostCalls(endpoint, request);

    }
    getByKey(entity: string, key: string, value: any) {
        const request: WebRequest = {
            entity: entity,
            filter: {
                exacts: true,
                limit: 1,
                page: 0,
                fieldsFilter: { [key]: value }
            }
        }
        const endpoint: string = contextPath().concat("api/app/entity/get");
        return commonAjaxPostCalls(endpoint, request);
    }
    getRecordsByKeyLike(entity: string, key: string, value: any) {
        const request: WebRequest = {
            entity: entity,
            filter: {
                // exacts: true,
                limit: 10,
                page: 0,
                fieldsFilter: { [key]: value }
            }
        }
        const endpoint: string = contextPath().concat("api/app/entity/get");
        return commonAjaxPostCalls(endpoint, request);
    }
    getById(entity: string, id: number) {
        const request: WebRequest = {
            entity: entity,
            filter: {
                exacts: true,
                limit: 1,
                page: 0,
                fieldsFilter: { 'id': id }
            }
        }
        const endpoint: string = contextPath().concat("api/app/entity/get");
        return commonAjaxPostCalls(endpoint, request);
    }
    getBy(code: string, fieldsFilter: {}, limit = 1) {
        const request: WebRequest = {
            entity: code,
            filter: {
                exacts: true,
                limit: limit,
                page: 0,
                fieldsFilter: fieldsFilter
            }
        }
        const endpoint: string = contextPath().concat("api/app/entity/get");
        return commonAjaxPostCalls(endpoint, request);
    }
    delete(code: string, id: number) {
        const request: WebRequest = {
            entity: code,
            filter: {
                fieldsFilter: { 'id': id }
            }
        }
        const endpoint: string = contextPath().concat("api/app/entity/delete");
        return commonAjaxPostCalls(endpoint, request);
    }
    save(code: string, model: BaseEntity, editMode: boolean) {
        const request: WebRequest = {
            entity: code,
            [code]: model
        }
        let endpoint: string;
        if (editMode) {
            endpoint = contextPath().concat("api/app/entity/update");
        } else {
            endpoint = contextPath().concat("api/app/entity/add");
        }
        return commonAjaxPostCalls(endpoint, request);
    }

    updateApplicationProfile = (applicationProfile: ApplicationProfile) => {
        const request: WebRequest = {
            profile: applicationProfile
        }
        const endpoint = contextPath().concat("api/app/setting/updateprofile");
        return commonAjaxPostCalls(endpoint, request)
    }
   

    generateReport(request: WebRequest) {
        const endpoint: string = contextPath().concat("api/app/report/records");
        return commonAjaxPostCallsWithBlob(endpoint, request);

    }
}