import { Body, Controller, Delete, Get, Headers, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { User } from './models/user.register';
import { User as UserRegisterDto } from './models/user.register';
import { User as UserLoginDto } from './models/user.login';
import { UserWhoami } from './models/user.whoami';
import { Movie } from './models/movie';

@Controller("/api")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("/movies")
  async getMovies() {
    return this.appService.getMovies();
  }

  @Post("/sign-in")
  signIn(@Body() body: UserLoginDto) {
    return this.appService.signIn(body.email, body.password);
  }

  @Post("/sign-up")
  signUp(@Body() body: UserRegisterDto) {
    return this.appService.signUp(body);
  }

  @Post("/whoami")
  whoAmI(@Body() body: UserWhoami) {
    return this.appService.whoAmI(body.token);
  }

  @Post("/like/:movieId")
  like(@Headers("userId") userId: string, @Body() movie: Movie) {
    return this.appService.like(userId, movie);
  }

  @Delete("/like/:movieId")
  unlike(@Param("movieId") movieId: number, @Headers("userId") userId: string) {
    return this.appService.unlike(movieId, userId);
  }

}
