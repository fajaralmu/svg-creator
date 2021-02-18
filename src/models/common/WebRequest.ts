 
import User from '../User'; 
import BaseEntity from '../BaseEntity';   
import Filter from './Filter'; 
import ApplicationProfile from '../ApplicationProfile';  

export default class WebRequest{
	entity?:string;
	user?:User;
	profile?:ApplicationProfile; 
	filter?:Filter;
	entityObject?:BaseEntity; 
	orderedEntities?:any[];
	regularTransaction?:boolean;
	imageData?:string; 
}
