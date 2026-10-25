import { Routes } from '@angular/router';

export const routes: Routes = [
  // Redirection par défaut (Prosit 2)
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  // Écran d'accueil
  {
    path: 'home',
    loadComponent: () => import('./components/home/home').then((m) => m.Home),
  },
  // Liste des conférences
  {
    path: 'conferences',
    loadComponent: () =>
      import('./components/conference-list/conference-list').then((m) => m.ConferenceList),
  },
  // Route paramétrée dynamique :id avec Signal Inputs (Prosit 3 & 4)
  {
    path: 'conferences/:id',
    loadComponent: () =>
      import('./components/conference-detail/conference-detail').then(
        (m) => m.ConferenceDetail
      ),
  },
  // Page de confirmation après inscription (Prosit 3)
  {
    path: 'confirmation',
    loadComponent: () =>
      import('./components/confirmation/confirmation').then((m) => m.Confirmation),
  },
  // Profil utilisateur
  {
    path: 'profile',
    loadComponent: () =>
      import('./components/profile/profile').then((m) => m.Profile),
  },
  // Page de contact
  {
    path: 'contact',
    loadComponent: () =>
      import('./components/contact/contact').then((m) => m.Contact),
  },
  // Module Administrateur en Lazy Loading avec Child Routes (Prosit 4)
  {
    path: 'admin',
    loadChildren: () =>
      import('./pages/admin/admin.routes').then((m) => m.ADMIN_ROUTES),
  },
  // Gestion des routes inexistantes - Page 404 (Prosit 2)
  {
    path: '**',
    loadComponent: () =>
      import('./components/not-found/not-found').then((m) => m.NotFound),
  },
];
