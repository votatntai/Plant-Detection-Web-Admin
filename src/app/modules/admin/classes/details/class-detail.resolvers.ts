import { inject } from '@angular/core';
import { forkJoin } from 'rxjs';
import { ClassService } from '../claass.service';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

export const initialDataResolver = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const classService = inject(ClassService);

    return forkJoin([
        classService.getClass(route.params['id']),
        classService.getClassStudents(route.params['id']),
    ]);
};
