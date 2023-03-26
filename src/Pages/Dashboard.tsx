import ReportSelect from "./ReportSelect";

export type DashboardProp =  {navigation : any}
export default function Default({ navigation} : DashboardProp) {

  return <ReportSelect navigation={navigation} />
}
