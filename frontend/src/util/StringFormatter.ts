export module StringFormatter {
     export function formatMillisecondDateToMMDDYYYY(date: Date): string {

        let dd = date.getDate().toString();
        let mm = date.getMonth() + 1;
        let mm1 = mm.toString();
        let yyyy = date.getFullYear().toString();

        if(dd.length < 2) {
            dd = "0" + dd;
        }
        if(mm1.length < 2) {
            mm1 = "0" + mm1;
        }

         let formattedDate = mm1.toString() + "/" + dd.toString() + "/" + yyyy.toString();
        return formattedDate;
    }
}
