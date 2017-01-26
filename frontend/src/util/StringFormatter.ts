export module StringFormatter {
     export function formatMilisecondDateToMMDDYYYY(date: Date): string {

        var dd = date.getDate().toString();
        var mm = date.getMonth() + 1;
        var mm1 = mm.toString();
        var yyyy = date.getFullYear().toString();

        if(dd.length < 2) {
            dd = '0' + dd;
        }
        if(mm1.length < 2) {
            mm1 = '0' + mm1;
        }

        var formattedDate = mm1.toString() + '/' + dd.toString() + '/' + yyyy.toString();
        return formattedDate;
    }
}
