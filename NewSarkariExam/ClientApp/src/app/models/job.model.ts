import { Url } from 'url';
import { Category } from './category.model';

export class CategoryDrowDown {
    disabled: boolean;
    group: string;
    selected: boolean;
    text: string;
    value: number;
}
export class Job {
    id: number;
    postName: string;
    postShortName: string;
    postedOn: Date;
    totalPost: number;
    lastUpdatedOn: Date;
    advtNo: string;
    postLink: Url;
    importantLinks: PostLinks[];
    importantDates: ImportantDates[];
    description: string;
    applicationStartDate: Date;
    applicationLastDate: Date;
    applicationLastDateOfFee: Date;
    categoryId: number;
    category: Category;
    otherDetails: string;

}
export class PostLinks {
    linkId: number;
    title: string;
    link: Url;
}
export class ImportantDates {
    id: number;
    title: string;
    dateOrText: string;
}
