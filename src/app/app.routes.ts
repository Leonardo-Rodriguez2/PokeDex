import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home.page/home.page.component';
import { PokemonsPageComponent } from './pages/pokemons.page/pokemons.page.component';
import { AboutPageComponent } from './pages/about.page/about.page.component';

export const routes: Routes = [
    { path: 'Home', component: HomePageComponent, title: ' Inicio ' },
    { path: 'Pokemones', component: PokemonsPageComponent, title: ' Pokemones ' },
    { path: 'Acerca de mi', component: AboutPageComponent, title: ' Acerca de mi ' },
    { path: '**', component: HomePageComponent, title: ' 404 ' }
];
