import EntityProperty from '../settings/EntityProperty';
import User from '../User';
import Filter from './Filter';
import BaseEntity from '../BaseEntity';
import ApplicationProfile from '../ApplicationProfile'; 
import HealthCenter from '../HealthCenter';
import Transaction from '../Transaction';
import Configuration from '../Configuration';
import InventoryData from '../stock/InventoryData';

export default class WebResponse{
	date?:Date;
	user?:User;
	code?:string;
	message?:string;
	entities?:any[];
	generalList?:any[];
	entity?:BaseEntity;
	filter?:Filter;
	totalData?:number;
	storage?:{};
	entityProperty?:EntityProperty;
	maxValue?:number;
	quantity?:number;
	applicationProfile?:ApplicationProfile;
	masterHealthCenter?:HealthCenter;
	percentage?:number;
	transaction?:Transaction;
	transactionYears?:any[];
	requestId?:string;
	token?:string;
	loggedIn?:Boolean;
	success?:boolean;
	entityClass?:any; 
	configuration?:Configuration;
	totalItems?:number = 0;
	inventoryData?: InventoryData;
	inventoriesData?: InventoryData[];

	rawAxiosResponse?:any;
}
