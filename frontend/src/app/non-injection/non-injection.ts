import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-non-injection',
    standalone: true,
    imports: [FormsModule, CommonModule],
    templateUrl: './non-injection.html',
    styleUrls: ['./non-injection.scss']
})
export class NonInjection {

    constructor(
        private http: HttpClient
    ) {}

    sql = 'SELECT * FROM city;';
    responseText = '';

    request() {
        this.http.post('city/noninjection', this.sql, { responseType: 'text' }).subscribe({
            next: (res) => {
                this.responseText = res;
            },
        });
    }
}
