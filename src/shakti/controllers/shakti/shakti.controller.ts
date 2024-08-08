import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Req, Res, UsePipes, ValidationPipe} from '@nestjs/common';

import { Request, Response } from 'express';

import { shaktidtos } from 'src/shakti/DTOS/shakti.dtos';
import { jina } from 'src/shakti/Entity/ram.entity';
import { shaktiService } from 'src/shakti/services/shakti/shakti.service';



@Controller('shakti')
export class ShaktiController {
// Decoretores are just functions:

// as query parameter:
// its url will be like localhost:3001/shakti?sortedBy=asc chnage asc to true beacuse it is converted to boolean
// localhost:3001/shakti?sortedBy=true
//     @Get()
//     getUser(@Query('sortBy',ParseBoolPipe)sortBy:boolean){
//         console.log(sortBy);
// return {username:'shaktiMan',email:'tamangshakti423@gmail.com'}
//     }



    @Post()  
    createUser(@Req()request:Request,@Res()response:Response){
console.log(request.body);
response.send('success');
    }

    @Post('create')
    saveUser(@Body() userData:shaktidtos){
console.log(userData);
return{};
    }

    // n TypeScript, route parameters are always treated as strings by default 
    // because URLs are inherently text-based. Even if you expect a number or other 
    // type, you need to convert the string to the desired type within your method. 
    // This ensures consistent handling of URL parameters


    // It takes the id from the URL and gives it to the getId method as a string.
    @Get(':id')
        getId(@Param('id')id:string){

console.log(id);
return {};
        }


constructor(private readonly shaktiSrvice:shaktiService){

}   



// svaing
@Post('/first')
@UsePipes(new ValidationPipe())
async create(@Body() dto: jina): Promise<{ message: string; data: jina }> {
    const findOneAll = await this.shaktiSrvice.find(dto.email);

    if (findOneAll!=null && findOneAll.length > 0) {
        console.log("User found");
        // You might want to handle this case differently, e.g., return an error response
        return {
            message: 'User already exists',

            // it returns existing userf
            data: findOneAll[0], // Assuming you want to return the existing user
        };
    } else {
        const createJina = await this.shaktiSrvice.create(dto);
        return {
            message: 'Successfully created',
            data: createJina,
        };
    }
}


// get all
@Get()
async getvalue():Promise<{message: string ; data: jina []}>{

    const shakti=await this.shaktiSrvice.findMany();
    return{
        message:'successful',
        data:shakti
    }
}

@Get('/get/:id')

// doing parse will bep to take parameter as integer only number
async getOneId(@Param('id',ParseIntPipe) id:number): Promise<{ message: string; data: jina | null }> {
    const data = await this.shaktiSrvice.findOne(Number(id));
    return {
        message: data ? 'Successful' : 'Not Found',
        data: data,
    };
}



@Delete('/delete/:id')
async deleteById(@Param('id',ParseIntPipe) id: number): Promise<{ message: string }> {
    await this.shaktiSrvice.deleteById(Number(id));
    return {
        message: 'Successfully deleted',
    };
}



@Patch('/update')
async editDetail(@Body() dto:jina):Promise<{ message:string; data:jina }>{
    const createJina = await this.shaktiSrvice.editDetail(dto);
    return {
      message: 'Successfully created',
      data: createJina,
    };
}
}
