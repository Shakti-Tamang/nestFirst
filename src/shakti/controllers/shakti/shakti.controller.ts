import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Inject, Param, ParseIntPipe, Patch, Post, Req, Res, UsePipes, ValidationPipe} from '@nestjs/common';

import { Request, Response } from 'express';

import { shaktidtos } from 'src/shakti/DTOS/shakti.dtos';
import { jina } from 'src/shakti/Entity/ram.entity';

import { ShaktiServiceInterface } from 'src/shakti/services/shakti/shakti.serviceinterface';



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


    
    
    
        // its is dependency injection to use and call methods from class  like autowired in java

        constructor(
            @Inject('ShaktiServiceInterface') private readonly shaktiSrvice: ShaktiServiceInterface,
        ) {


        }



// svaing
@Post('/first')
@HttpCode(200) // Sets the HTTP status code to 201 Created for a successful response
@UsePipes(new ValidationPipe())
async create(@Body() dto: jina) {
    const findOneAll = await this.shaktiSrvice.find(dto.email);

    if (findOneAll != null && findOneAll.length > 0) {
        // If the user already exists, throw an exception with a 409 Conflict status
        throw new HttpException('User already exists', HttpStatus.CONFLICT);
    } else {
        // Create the user and return a success message
        await this.shaktiSrvice.create(dto);
        return { message: 'User successfully registered' }; // The @HttpCode(201) decorator ensures this returns with a 201 status
    }
}

@Get()
@HttpCode(200) // Changed to 200 OK as it's standard for GET requests
async getvalue() {
    try {
        const shakti = await this.shaktiSrvice.findMany();

        return {
            message: 'Successful',
            data: shakti,
        };
    } catch (error) {
        console.error('Error fetching data:', error);
        throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
}

@Get('/get/:id')

// doing parse will bep to take parameter as integer only number  chnage input data type
// now you must send number in json
async getOneId(@Param('id',ParseIntPipe) id:number) {
    const data = await this.shaktiSrvice.findOne(Number(id));

    if(!data){

        throw new HttpException("user nout found",HttpStatus.BAD_REQUEST);
    }
    return {
        message: data ? 'Successful' : 'Not Found',
        data: data,
    };
}



@Delete('/delete/:id')
async deleteById(@Param('id',ParseIntPipe) id: number) {
    await this.shaktiSrvice.deleteById(Number(id));
    return {
        message: 'Successfully deleted',
    };
}



@Patch('/update')
async editDetail(@Body() dto:jina){

    try{
    const createJina = await this.shaktiSrvice.editDetail(dto);
    return {
      message: 'Successfully edited',
      data: createJina,
    };
}catch(error){
    console.error('Error fetching data:', error);
        throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    } 
}
    
}

