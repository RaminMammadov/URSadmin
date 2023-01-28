// import URSloginPage from "../Pages/URSloginPage";

import URSaboutusPage from '../Pages/URSaboutusPage';
import URSserviceAndEducationPage from '../Pages/URSserviceAndEducationPage';
import URSaddNewServiceAndEducation from '../Components/URSserviceAndEducation/URSaddNewServiceAndEducation';
import URSportfolioPage from '../Pages/URSportfolioPage';
import URSaddNewPortfolio from "../Components/URSportfolio/URSaddNewPortfolio";
import URSmentorsPage from '../Pages/URSmentorsPage';
import URSaddNewMentor from "../Components/URSmentors/URSaddNewMentor";
import URSconcactPage from '../Pages/URScontacPage';
import URSserviceAndEducationCountriesPage from "../Pages/URSserviceAndEducationCountriesPage";
import URSaddNewServiceAndEducationCountry from "../Components/URSserviceAndEducationCountries/URSaddNewServiceAndEducationCountry";
import URSyoutubeVideosPage from "../Pages/URSyoutubeVideosPage";
import URSaddNewYoutubeVideo from "../Components/URSyoutubeVideos/URSaddNewYoutubeVideo";
import URSfrequentlyAskedQuestionsPage from "../Pages/URSfrequentlyAskedQuestionsPage";
import URSaddNewFrequentlyAskedQuestion from "../Components/URSfrequentlyAskedQuestions/URSaddNewFrequentlyAskedQuestion";
import URSaddNewOffice from '../Components/URScontact/URSaddNewOffice';
import URSsettingsPage from "../Pages/URSsettingsPage"; 
import URSaddNewUserPage from "../Pages/URSaddNewUserPage";
import URSeditProfilePage from "../Pages/URSeditProfilePage";

function routing(path,component) {
    return {
        path,
        component
    }
}

const navRoutes = {
    URShomePage:routing('/',<URSaboutusPage />),

    URSaboutusPage:routing('/URSaboutusPage',<URSaboutusPage />),

    URSserviceAndEducationPage:routing('/URSserviceAndEducationPage',<URSserviceAndEducationPage />),
    URSaddNewServiceAndEducation:routing('/URSserviceAndEducationPage/URSaddNewServiceAndEducation',<URSaddNewServiceAndEducation />),
    URSserviceAndEducationCountriesPage:routing('/URSserviceAndEducationCountriesPage',<URSserviceAndEducationCountriesPage />),
    URSaddNewServiceAndEducationCountry:routing("/URSserviceAndEducationCountriesPage/URSaddNewServiceAndEducationCountry",<URSaddNewServiceAndEducationCountry />),

    URSyoutubeVideosPage:routing('/URSyoutubeVideosPage',<URSyoutubeVideosPage />),
    URSaddNewYoutubeVideo:routing('/URSyoutubeVideosPage/URSaddNewYoutubeVideo',<URSaddNewYoutubeVideo />),

    URSportfolioPage:routing('/URSportfolioPage',<URSportfolioPage />),
    URSaddPortfolio:routing('/URSportfolioPage/URSaddNewPortfolio',<URSaddNewPortfolio />),

    URSmentorsPage:routing('/URSmentorsPage',<URSmentorsPage />),
    URSaddNewMentor:routing('/URSmentorsPage/URSaddNewMentor',<URSaddNewMentor />),

    URSfrequentlyAskedQuestionsPage:routing('/URSfrequentlyAskedQuestionsPage',<URSfrequentlyAskedQuestionsPage />),
    URSaddNewFrequentlyAskedQuestion:routing('/URSfrequentlyAskedQuestionsPage/URSaddNewFrequentlyAskedQuestion',<URSaddNewFrequentlyAskedQuestion />),

    URSconcactPage:routing('/URSconcactPage',<URSconcactPage />),
    URSaddNewOffice:routing('/URSconcactPage/URSaddNewOffice',<URSaddNewOffice />),

    URSsettingsPage:routing('/URSsettingsPage',<URSsettingsPage />),
    URSaddNewUserPage:routing('/URSaddNewUserPage',<URSaddNewUserPage />),
    URSeditProfilePage:routing('/URSeditProfilePage',<URSeditProfilePage />)
    
}
const routArr = Object.values(navRoutes);
export {routArr};