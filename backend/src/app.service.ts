import { BadRequestException, HttpService, Injectable, NotFoundException } from '@nestjs/common';
import { User as UserRegisterDto } from './models/user.register';
import { User as UserLoginDto } from './models/user.register';
import { User } from './models/user';
import { Movie } from './models/movie';

@Injectable()
export class AppService {
  
  storedData: Record<string, User> = {};
  constructor(private readonly httpService: HttpService) {

  }

  async signUp(userData: UserRegisterDto) {
    const id: string = Math.random().toString().substr(-6, 6);
    const user: User = {
      ...userData,
      id,
      likes: []
    }
    this.storedData = {
      ...this.storedData,
      [id]: user,
    };
    return user;
  }

  async signIn(email: string, password: string) {
    const user = Object.entries(this.storedData).find(([_, data]) => {
      if(data.email === email && password === data.password) {
        return data;
      }
    })
    if(!user) {
      throw new NotFoundException("No user with such credentials exist");
    }
    return user[1];
  }

  whoAmI(id: string) {
    const foundData = this.storedData[id];
    if(!foundData) {
      throw new BadRequestException("User with this token does not exist");
    }
    return foundData;
  }

  like(userId: string, movie: Movie) {
    const user = this.storedData[userId];
    if(!user) {
      throw new BadRequestException("This user does not exist");
    }
    user.likes.push(movie);
    return user;
  }

  unlike(movieId: number, userId: string) {
    const user = this.storedData[userId];
    if(!user) {
      throw new BadRequestException("This user does not exist");
    }
    user.likes = user.likes.filter(film => film.show.id.toString() !== movieId.toString());
    return user;
  }

  async getMovies(): Promise<any> {
    try {
      return this.httpService.get("/")
      // const url = 'https://api.tvmaze.com/search/shows';
      // return await this.httpService.get(url, {params: {q: "girls"}}).toPromise();
    } catch (err) {
      console.log(err);
    }
  }
}
