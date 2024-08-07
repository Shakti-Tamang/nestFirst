import { Body, Controller, Get, Param, Post, Query, Req, Res} from '@nestjs/common';
import { Request, Response } from 'express';
import { shaktidtos } from 'src/shakti/DTOS/shakti.dtos';


@Controller('shakti')
export class ShaktiController {

// Decoretores are just functions:

// as query parameter:
// its url will be like localhost:3001/shakti?sortedBy=asc
    @Get()
    getUser(@Query('sortBy')sortBy:string){
        console.log(sortBy);
return {username:'shaktiMan',email:'tamangshakti423@gmail.com'}
    }



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

}
