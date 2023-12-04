import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Exam } from 'app/types/exam.type';
import { Pagination } from 'app/types/pagination.type';
import { environment } from 'environments/environment.development';
import { BehaviorSubject, Observable, map, switchMap, take, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ExamService {

    private baseUrl = environment.baseUrl;

    private _exam: BehaviorSubject<Exam | null> = new BehaviorSubject(null);
    private _exams: BehaviorSubject<Exam[] | null> = new BehaviorSubject(null);
    private _pagination: BehaviorSubject<Pagination | null> = new BehaviorSubject(null);

    constructor(private _httpClient: HttpClient) { }

    /**
 * Getter for exam
 */
    get exam$(): Observable<Exam> {
        return this._exam.asObservable();
    }

    /**
     * Getter for exams
     */
    get exams$(): Observable<Exam[]> {
        return this._exams.asObservable();
    }

    /**
 * Getter for pagination
 */
    get pagination$(): Observable<Pagination> {
        return this._pagination.asObservable();
    }

    /**
 * Get exams
 *
 *
 * @param page
 * @param size
 * @param sort
 * @param order
 * @param search
 */
    getExams(pageNumber: number = 0, pageSize: number = 10, search?: string):
        Observable<{ pagination: Pagination; data: Exam[] }> {
        return this._httpClient.get<{ pagination: Pagination; data: Exam[] }>(this.baseUrl + '/api/exams', {
            params: {
                pageSize: pageSize,
                pageNumber: pageNumber,
                ...(search !== undefined && search !== null && { name: search }),
            }
        }).pipe(
            tap((response) => {
                this._pagination.next(response.pagination);
                this._exams.next(response.data);
            }),
        );
    }

    /**
* Create exam
*/
    createExam(data) {
        return this.exams$.pipe(
            take(1),
            switchMap((exams) => this._httpClient.post<Exam>(this.baseUrl + '/api/exams', data).pipe(
                map((newExam) => {

                    // Update exam list with current page size
                    this._exams.next([newExam, ...exams].slice(0, this._pagination.value.pageSize));

                    return newExam;
                })
            ))
        )
    }

    /**
* Get exam by id
*/
    getExam(id: string) {
        return this._httpClient.get<Exam>(this.baseUrl + '/api/exams/' + id).pipe(tap((response) => {
            this._exam.next(response);
        }))
    }

}