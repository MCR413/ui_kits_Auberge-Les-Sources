// app.jsx — root component for the Auberge Les Sources mobile prototype

const { useState: useSt, useRef: useR, useEffect: useEf } = React;

function App() {
  const [tab, setTab] = useSt('home');
  const [discoverInitial, setDiscoverInitial] = useSt('activities');
  const [toast, setToast] = useSt(false);
  const scrollRef = useR(null);

  const go = (target) => {
    if (target === 'discover')          { setDiscoverInitial('activities'); setTab('discover'); }
    else if (target === 'discover-restos') { setDiscoverInitial('restos');  setTab('discover'); }
    else                                  { setTab(target); }
  };

  // Reset scroll on tab change
  useEf(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
  }, [tab]);

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', background: 'var(--bg-page)' }} data-screen-label={`Mobile · ${tab}`}>
      {tab === 'home'      && <HomeScreen scrollRef={scrollRef} go={go}/>}
      {tab === 'discover'  && <DiscoverScreen scrollRef={scrollRef} go={go} initialTab={discoverInitial} key={discoverInitial}/>}
      {tab === 'breakfast' && <BreakfastScreen scrollRef={scrollRef}/>}
      {tab === 'stay'      && <StayScreen scrollRef={scrollRef}/>}

      <TabBar active={tab} onChange={setTab}/>
      <ConfirmToast show={toast} onDismiss={() => setToast(false)}/>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<App/>);
