import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'classStatusStyle'
})
export class ClassStatusPipe implements PipeTransform {

    transform(status: string): string {
        switch (status) {
            case 'In Progress':
                return 'text-blue-500 border-2 border-blue-500 px-3 rounded-full py-1';
            case 'Completed':
                return 'text-green-500 border-2 border-green-500 px-3 rounded-full py-1';
            case 'Cancelled':
                return 'text-red-500 border-2 border-red-500 px-3 rounded-full py-1';
            case 'Rejected':
                return 'text-red-500 border-2 border-red-500 px-3 rounded-full py-1';
            case 'Pending Approval':
                return 'text-orange-500 border-2 border-orange-500 px-3 rounded-full py-1';
            case 'On Hold':
                return 'text-purple-500 border-2 border-purple-500 px-3 rounded-full py-1';
            case 'Pending Review':
                return 'text-pink-500 border-2 border-pink-500 px-3 rounded-full py-1';
            default:
                return '';
        }
    }
}
