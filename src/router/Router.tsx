import { lazy, Suspense } from 'react';
import { Outlet, RouteObject, useRoutes, BrowserRouter, useNavigate } from 'react-router-dom';

const Loading = () => <p className="p-4 w-full h-full text-center">Loading...</p>;

const IndexScreen = lazy(() => import('~/screens/Index'));
const QuestionsScreen = lazy(() => import('~/screens/Questions'));
const SummaryScreen = lazy(() => import('~/screens/Summary'));
const ScorecardScreen = lazy(() => import('~/screens/Scorecard'));
const Page404Screen = lazy(() => import('~/screens/404'));

function Layout() {
  const navigate = useNavigate();

  const gotoHome = () => {
    navigate('/');
  }

  return (
    <div className="min-h-screen">
      <div className="bg-primary">
        <div 
          className="font-display text-4xl font-bold text-white absolute top-6 left-6 md:top-6 md:left-36 hover:text-primary-focus hover:cursor-pointer"
          onClick={gotoHome}
        >
          The Baby Pool
        </div>
        <div onClick={gotoHome}>
          <img 
            className="object-contain absolute top-1 right-6 md:right-32 lg:right-36 cursor-pointer" 
            src="/floaty.png"  
            width="70px" 
            height="70px" 
          />
        </div>
        
        <nav className="flex p-4 items-center">
          &nbsp;
        </nav>
      </div>
      <div className="bg-primary border-b-primary-focus border-b-2 rotate-1 h-9 w-full absolute top-11 -z-10">&nbsp;</div>
      <div className="mb-4">&nbsp;</div>
      <Outlet />
      <div className="sticky top-[100vh] relative mt-20">
        <div className="bg-primary rotate-1 h-6 w-full -z-10 absolute -top-3 border-t-2 border-t-primary-focus">&nbsp;</div>
        <div className="bg-primary h-20">
          <div className="container mx-auto px-6">
            <ul>
              <li className="hover:underline hover:cursor-pointer" onClick={gotoHome}>The Baby Pool</li>
              <li><a href="#">PRGRN.dev</a></li>
            </ul>
          </div>
        </div>
      </div>
      
    </div>
  );
}

export const Router = () => {
  return (
    <BrowserRouter>
      <InnerRouter />
    </BrowserRouter>
  );
};

const InnerRouter = () => {
  const routes: RouteObject[] = [
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          index: true,
          element: <IndexScreen />,
        },
        {
          path: '/questions',
          element: <QuestionsScreen />,
        },
        {
          path: '/summary',
          element: <SummaryScreen />,
        },
        {
          path: '/scorecard',
          element: <ScorecardScreen />,
        },
        {
          path: '*',
          element: <Page404Screen />,
        },
      ],
    },
  ];
  const element = useRoutes(routes);
  return (
    <div>
      <Suspense fallback={<Loading />}>{element}</Suspense>
    </div>
  );
};
