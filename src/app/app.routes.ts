import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home.page/home.page.component';
import { PokemonsPageComponent } from './pages/pokemons.page/pokemons.page.component';
import { AboutPageComponent } from './pages/about.page/about.page.component';

export const routes: Routes = [
    { path: 'home', component: HomePageComponent, title: ' Inicio ' },
    { path: 'pokemons', component: PokemonsPageComponent, title: ' Pokemones ' },
    { path: 'about', component: AboutPageComponent, title: ' Acerca de mi ' },
    { path: '**', component: HomePageComponent, title: ' 404 ' }
];
