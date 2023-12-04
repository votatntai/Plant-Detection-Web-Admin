import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pagination } from 'app/types/pagination.type';
import { Question } from 'app/types/question.type';
import { environment } from 'environments/environment.development';
import { BehaviorSubject, Observable, map, switchMap, take, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class QuestionService {

    private baseUrl = environment.baseUrl;

    private _question: BehaviorSubject<Question | null> = new BehaviorSubject(null);
    private _questions: BehaviorSubject<Question[] | null> = new BehaviorSubject(null);
    private _pagination: BehaviorSubject<Pagination | null> = new BehaviorSubject(null);

    constructor(private _httpClient: HttpClient) { }

    /**
 * Getter for question
 */
    get question$(): Observable<Question> {
        return this._question.asObservable();
    }

    /**
     * Getter for questions
     */
    get questions$(): Observable<Question[]> {
        return this._questions.asObservable();
    }

    /**
 * Getter for pagination
 */
    get pagination$(): Observable<Pagination> {
        return this._pagination.asObservable();
    }

    /**
 * Get questions
 *
 *
 * @param page
 * @param size
 * @param sort
 * @param order
 * @param search
 */
    getQuestions(pageNumber: number = 0, pageSize: number = 10, search?: string):
        Observable<{ pagination: Pagination; data: Question[] }> {
        return this._httpClient.get<{ pagination: Pagination; data: Question[] }>(this.baseUrl + '/api/questions', {
            params: {
                pageSize: pageSize,
                pageNumber: pageNumber,
                ...(search !== undefined && search !== null && { name: search }),
            }
        }).pipe(
            tap((response) => {
                this._pagination.next(response.pagination);
                this._questions.next(response.data);
            }),
        );
    }

    /**
* Create question
*/
    createQuestion(data) {
        return this.questions$.pipe(
            take(1),
            switchMap((questions) => this._httpClient.post<Question>(this.baseUrl + '/api/questions', data).pipe(
                map((newQuestion) => {

                    // Update question list with current page size
                    this._questions.next([newQuestion, ...questions].slice(0, this._pagination.value.pageSize));

                    return newQuestion;
                })
            ))
        )
    }

    /**
* Get question by id
*/
    getQuestion(id: string) {
        return this._httpClient.get<Question>(this.baseUrl + '/api/questions/' + id + '/result').pipe(tap((response) => {
            this._question.next(response);
        }))
    }

}