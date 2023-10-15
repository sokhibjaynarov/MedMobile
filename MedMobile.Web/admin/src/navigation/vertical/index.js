// ** Navigation imports
import apps from "./apps";
// import pages from './pages'
import forms from "./forms";
// import tables from './tables'
// import others from './others'
// import charts from './charts'
import doctors from "./doctors";
import patients from "./patients";
import reception from "./reception";
// import dashboards from './dashboards'
// import uiElements from './ui-elements'

// ** Merge & Export
export default [...apps, ...doctors, ...patients, ...reception];
