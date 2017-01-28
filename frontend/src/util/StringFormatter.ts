export namespace StringFormatter {
    export function formatMillisecondDateToMMDDYYYY(date: Date): string {

        let dd = date.getDate().toString();
        const mm = date.getMonth() + 1;
        let mm1 = mm.toString();
        const yyyy = date.getFullYear().toString();

        if (dd.length < 2) {
            dd = "0" + dd;
        }
        if (mm1.length < 2) {
            mm1 = "0" + mm1;
        }

        const formattedDate = mm1.toString() + "/" + dd.toString() + "/" + yyyy.toString();
        return formattedDate;
    }
}
