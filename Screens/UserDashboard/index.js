import React, { useEffect } from "react";
import { useState } from "react";
import { Text } from "react-native";
import DefaultView from "../../Layouts/DefaultView";
import DefaultModal from "../../Layouts/DefaultModal"
import HistoryTablet from "../../Components/DashboardMenu/HistoryTablet"
import ReportsTablet from "../../Components/DashboardMenu/ReportsTablet";


import DashboardMenu from "../../Components/DashboardMenu";
import { API_ROOT } from "../../apiroot";
import NotCuredReport from "../ModalScreens/NotCuredReport";
import { getDetectionHistory, getReports } from "./helper";


const findDetailsByDiseaseId = async (diseaseId) => {
  console.log("finding details by disease id")
  const result = await fetch( API_ROOT + '/detection-details-by-disease-id/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({disease_id: diseaseId})
  })
  return await result.json()

}



const UserDashboard = ({navigation, route}) => {
  const userDetails = route.params
  const [menu, setMenu] = useState('History')
  const [history, setHistory] = useState([])
  const [reports, setReports] = useState([])

  const [emptyHistory, setEmptyHistory] = useState(false);
  const [emptyReports, setEmptyReports] = useState(false);
  const [reportModalVisible, setReportModalVisible] = useState(false);

  const [selectedtHistoryData, setSelectedHistoryData] = useState({})
  const [fetchedHistoryData, setFetchedHistoryData] = useState({})

  const hideReportModal = () => setReportModalVisible(false);
  const showReportModal = () => setReportModalVisible(true);
  
  //To get history about all detections and reports
  useEffect( () => {
    const userId = userDetails.user.id
    // const userId = 1
    getDetectionHistory(userId).then( result => {
      if(result.length === 0){
        setEmptyHistory(true)
      }
      else {
        console.log("history")
        console.log(result)
        setHistory(result)
      }
    })
    getReports(userId).then(result => {
      if(result.length === 0){
        setEmptyReports(true)
      }
      else {
        console.log("reports")
        console.log(result)
        setReports(result)
      }
    })
  }, [] )
  
  // To get other details about the detection history from db
  useEffect( () => {
    if(Object.keys(selectedtHistoryData).length !== 0){
      const diseaseId = selectedtHistoryData.disease;
      findDetailsByDiseaseId(diseaseId).then((result)=> {
        setFetchedHistoryData(result)
      })
    }
  }, [selectedtHistoryData] )

  let toShow;
  if(menu === 'history') {
    toShow =  emptyHistory ? <Text> No History To Show </Text>  : ( <>
      {
        history.map((element, index) => {
          return (
          <HistoryTablet
            history={element}
            key={index}
            showReportModal={ showReportModal }
            setSelectedHistoryData={setSelectedHistoryData}
          />
          )
        })
      }
    </>
  );
  }
  else {
    toShow = emptyReports ? <Text> No Reports Submitted yet</Text> : 
    (
      <> {
      reports.map((report, index) => {
        return(
          <ReportsTablet 
            report={report}
            key={index}
            />
        )
        })
    }
      </>
    )
  }
  const tabs = {
    tab1: 'History',
    tab2: 'Reports'
  }
  return (
    <DefaultView navigation={navigation} userDetails={userDetails}>
          <DashboardMenu
            toShow={toShow}
            setMenu={setMenu}
            menu={menu}
            tabs={tabs}
          />
          <DefaultModal
            modalVisible={reportModalVisible}
            hideModal={hideReportModal}
          >
            <NotCuredReport 
              selectedtHistoryData={selectedtHistoryData}
              fetchedHistoryData={fetchedHistoryData}
              hideModal={hideReportModal}
            />
          </DefaultModal>
    </DefaultView>
  )
}

export default UserDashboard;