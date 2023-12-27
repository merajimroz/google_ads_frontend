import {
    createBrowserRouter
} from "react-router-dom"

import LoginPage from "./pages/Login"
import HomePage from './pages/Home'
import GoogleAdsPage from "./pages/GoogleAds"
import CampaignPage from "./pages/Campaign"
import CampaignRootLoader from "./loader/CampaignLoader"
import CreateNewCampaign from "./components/CreateCampaign"
import RegisterPage from "./pages/Register"
import GoogleRefreshTokenPage from "./pages/GooglePage"
import CreateAccount from "./components/CreateAccount"
import GoogleAdsCustomersPage from "./pages/Customers"
import CustomerLoader from "./loader/CustomerLoader"
import DynamicSearchGoogleAds from "./pages/DynamicSearchGoogleAds"
import SuccessCard from "./components/SuccessMessage"
import AdGroupForm from "./components/CreateAdGroup"
import ResponsiveSearchAds from "./components/CreateResponsiveSearchAds"
import ExcelManageAds from "./pages/ExcelManageAds"
import AdgroupPage from "./pages/AdGroupPage"
import AdgroupLoader from "./loader/AdGroupLoader"

const router = createBrowserRouter([
    {
        path: '/login',
        element: <LoginPage />
    },
    {
        path: '/create-account',
        element: <RegisterPage/>
    },
    {
        path: '/',
        element: <HomePage />
    },
    {
        path:"/google-refresh-token",
        element: <GoogleRefreshTokenPage/>
    },
    {
        path: '/googleads',
        element: <GoogleAdsPage />,
        children: [
            {
                path: "campaigns/:customerId",
                loader: CampaignRootLoader,
                element: <CampaignPage />,
            },
            {
                path: 'campaigns/new/:customerId',
                element: <CreateNewCampaign/>
            },
            {
                path: 'customer/create',
                element: <CreateAccount/>
            },
            {
                path: 'customers',
                loader: CustomerLoader,
                element: <GoogleAdsCustomersPage/>
            },
            {
                path: 'adgroups/:customerId/:campaignId',
                loader: AdgroupLoader,
                element: <AdgroupPage/>
            },
            {
                path: 'dynamic-search',
                element: <DynamicSearchGoogleAds/>
            },
            {
                path: 'responsive-search',
                element: <ResponsiveSearchAds/>  
            },
            {
                path: 'success',
                element: <SuccessCard/>
            },
            {
                path: 'adgroups/new/:customerId/:campaignId`',
                element: <AdGroupForm/>
            }, 
            {
                path: 'excel-manage-ads/:customerId/:campaignId/:adGroupId',
                element: <ExcelManageAds/>
            }
        ]
    },
])

export default router