import React, { useEffect, useRef, memo } from 'react';

function TradingViewWidget() {
  const container = useRef(null);
  const widgetRef = useRef(null);

  useEffect(() => {
    if (!container.current) return;
    if (widgetRef.current) return;

    // Clear any existing children to prevent duplicates
    if (container.current.children.length > 0) {
      container.current.innerHTML = '';
    }

    // Wait for TradingView to load
    const checkAndInit = () => {
      if (window.TradingView) {
        try {
          widgetRef.current = new window.TradingView.widget({
            autosize: true,
            symbol: 'BITSTAMP:BTCUSD',
            interval: 'D',
            timezone: 'UTC',
            theme: 'dark',
            style: '1',
            locale: 'en',
            toolbar_bg: '#0c0a0f',
            enable_publishing: false,
            allow_symbol_change: true,
            container_id: container.current.id || 'tradingview-chart',
            studies: [],
            hide_legend: false,
            hide_volume: false,
            hide_side_toolbar: true,
            hide_top_toolbar: false,
            calendar: false,
            details: true,
            hotlist: false,
            watchlist: [],
            withdateranges: false,
            range: 'YTD',
            compareSymbols: [
              { symbol: 'BITSTAMP:ETHUSD', position: 'SameScale' },
              { symbol: 'TRADENATION:SOLANA', position: 'SameScale' },
              { symbol: 'CRYPTOCAP:USDT', position: 'SameScale' }
            ],
            support_host: 'https://www.tradingview.com'
          });
        } catch (err) {
          console.error('TradingView widget error:', err);
        }
      } else {
        setTimeout(checkAndInit, 500);
      }
    };
    checkAndInit();

    return () => {
      // Cleanup on unmount
      if (widgetRef.current) {
        try {
          widgetRef.current = null;
        } catch (e) {}
      }
    };
  }, []);

  return (
    <div className="tradingview-widget-container" ref={container} id="tradingview-chart" style={{ height: "100%", width: "100%" }}>
      <div className="tradingview-widget-container__widget" style={{ height: "100%", width: "100%" }}></div>
      <div className="tradingview-widget-copyright text-slate-500 text-[10px] mt-1">
        <a href="https://www.tradingview.com/symbols/BTCUSD/?exchange=BITSTAMP" rel="noopener nofollow" target="_blank" className="text-blue-400 hover:underline">
          Bitcoin price
        </a>
        <span className="text-slate-600"> by TradingView</span>
      </div>
    </div>
  );
}

export default memo(TradingViewWidget);
