import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Inject, Param, ParseIntPipe, Patch, Post, Req, Res, UseGuards, UsePipes, ValidationPipe} from '@nestjs/common';

import { Request, Response } from 'express';
import { AuthService } from 'src/auth-module/auth.service';
import { JwtAuthGuard } from 'src/auth-module/jwt-auth.guard';
import { RolesGuard } from 'src/auth-module/roleguard.role';
import { Roles } from 'src/auth-module/roles.decorator';

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
            private readonly authService: AuthService,
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

@Post('/login')
async login(@Body() loginDto: jina) {
  try {
    // Extract username and password from the entity
    const { username, password } = loginDto;

    // Validate the user credentials
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    // Generate JWT token
    const token = await this.authService.login(user);

    return {
      message: 'Login successful',
      access_token: token.access_token,
    };
  } catch (error) {
    console.error('Error during login:', error);
    throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
  }
}


@Get()
@HttpCode(200) // Changed to 200 OK as it's standard for GET requests
@UseGuards(JwtAuthGuard,RolesGuard)
@Roles('Admin')
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
@UseGuards(JwtAuthGuard,RolesGuard)
@Roles('Admin')
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
@UseGuards(JwtAuthGuard,RolesGuard)
@Roles('Admin')
async deleteById(@Param('id',ParseIntPipe) id: number) {
    await this.shaktiSrvice.deleteById(Number(id));
    return {
        message: 'Successfully deleted',
    };
}


@Patch('/update')
@UseGuards(JwtAuthGuard,RolesGuard)
@Roles('Admin')
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

