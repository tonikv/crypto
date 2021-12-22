/*
    Component for user to pick date range to use in coinGecko API query.
    Basic form element with two input with date type.
    We validate inputs before passing them to getData function. 
    
    Todo:
    errors in inputs are only console logged. Create component to show user that information in UI.
*/

const DatePicker = ( {getData} ) => {

    function validateDates(e) {
        e.preventDefault();

        //Check that user has given both dates
        if(!e.target.from.value && !e.target.to.value) {
            console.log("ERROR: Missing value!");
            return;
         }

         // Get dates from input fields and convert to Date objects for validation
         const fromDate = new Date(e.target.from.value);
         const toDate = new Date(e.target.to.value);
         const today = new Date();
         
         //Check that dates aren't same
         if(fromDate.toDateString() === toDate.toDateString()) {
           console.log("ERROR: Give two different dates!");
           return;
         }

         // coinGecko has data beginning in 2013 so do not allow inputs before that
         if(fromDate.getFullYear() < 2013) {
             console.log("ERROR: No data before 2013!")
            return;
         }
     
         //Check that start is before end
         if(fromDate > toDate) {
             console.log("ERROR: Start before end!");
             return;
         }

         // Check that dates are't in future
         if(fromDate > today || toDate > today) {
             console.log("ERROR: No data in future!");
             return;
         }

         const dates = {
             "from": fromDate.getTime() / 1000,
             "to": (toDate.getTime() / 1000) + 1600 // Add one hour to timestamp to make sure that we get data for end date as well
         }

         getData(dates)
    }

    return (
        <div className="date-form-container">
            <form onSubmit={validateDates}>
                <label htmlFor="from">Start Date:</label><br></br>
                <input className="date-input" type="date" id="from" name="from"></input><br></br>
                <label htmlFor="to">End Date:</label><br></br>
                <input className="date-input" type="date" id="to" name="to"></input><br></br>
                <button type="submit" className="date-button">Get Data from API</button>
            </form>
        </div>
    )
}

export default DatePicker
