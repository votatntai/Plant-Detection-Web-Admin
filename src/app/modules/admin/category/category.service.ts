import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from 'app/types/category.type';
import { Pagination } from 'app/types/pagination.type';
import { environment } from 'environments/environment.development';
import { BehaviorSubject, Observable, map, switchMap, take, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CategoryService {

    private baseUrl = environment.baseUrl;

    private _category: BehaviorSubject<Category | null> = new BehaviorSubject(null);
    private _categories: BehaviorSubject<Category[] | null> = new BehaviorSubject(null);
    private _pagination: BehaviorSubject<Pagination | null> = new BehaviorSubject(null);

    constructor(private _httpClient: HttpClient) { }

    /**
 * Getter for category
 */
    get category$(): Observable<Category> {
        return this._category.asObservable();
    }

    /**
     * Getter for categories
     */
    get categories$(): Observable<Category[]> {
        return this._categories.asObservable();
    }

    /**
 * Getter for pagination
 */
    get pagination$(): Observable<Pagination> {
        return this._pagination.asObservable();
    }

    /**
 * Get categories
 *
 *
 * @param page
 * @param size
 * @param sort
 * @param order
 * @param search
 */
    getCategories(pageNumber: number = 0, pageSize: number = 10, search?: string):
        Observable<{ pagination: Pagination; data: Category[] }> {
        return this._httpClient.get<{ pagination: Pagination; data: Category[] }>(this.baseUrl + '/api/categories', {
            params: {
                pageSize: pageSize,
                pageNumber: pageNumber,
                ...(search !== undefined && search !== null && { name: search }),
            }
        }).pipe(
            tap((response) => {
                this._pagination.next(response.pagination);
                this._categories.next(response.data);
            }),
        );
    }

    /**
* Create category
*/
    createCategory(data) {
        return this.categories$.pipe(
            take(1),
            switchMap((categories) => this._httpClient.post<Category>(this.baseUrl + '/api/categories', data).pipe(
                map((newCategory) => {

                    // Update category list with current page size
                    this._categories.next([newCategory, ...categories].slice(0, this._pagination.value.pageSize));

                    return newCategory;
                })
            ))
        )
    }

    /**
* Get category by id
*/
    getCategory(id: string) {
        return this._httpClient.get<Category>(this.baseUrl + '/api/categories/' + id).pipe(tap((response) => {
            this._category.next(response);
        }))
    }

}