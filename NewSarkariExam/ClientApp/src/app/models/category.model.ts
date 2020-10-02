export class Category{
    id: number;
   name: string;
   shortName: string;
   stateName: string;
   description: string;
   categoryStatus: boolean;
}

export class CategoryResponse{
    code: number;
    message: string;
    description: string;
}
