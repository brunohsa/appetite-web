import { format } from 'date-fns';

const FORMATO_DATA_DD_MM_YYYY = 'dd/MM/yyyy'

let DateUtils = {

    getDataAgoraFormatada() {
        let data = new Date()
        return format(data, FORMATO_DATA_DD_MM_YYYY)
    }

}

export default DateUtils