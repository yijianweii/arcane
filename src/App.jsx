import { useState } from 'react';

function App() {
  const [theme, setTheme] = useState('light');
  return (
    <>
      <div className={`${theme}`}>
        <div  className="dark:bg-gray-800 bg-gray-100">
          <div>这是内容1</div>
          <div className="flex justify-between w-[70px] border-2 border-dotted rounded-full py-1 px-2">
            <svg
              className="cursor-pointer"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 -960 960 960"
              height="20"
              width="20"
              onClick={() => setTheme('dark')}
            >
              <path
                d={
                  theme === 'dark'
                    ? 'M480-120q-150 0-255-105T120-480q0-150 105-255t255-105q8 0 17 .5t23 1.5q-36 32-56 79t-20 99q0 90 63 153t153 63q52 0 99-18.5t79-51.5q1 12 1.5 19.5t.5 14.5q0 150-105 255T480-120Z'
                    : 'M481.154-140.001q-141.666 0-240.832-99.167Q141.155-338.334 141.155-480q0-135.768 92.115-232.883 92.114-97.115 225.575-105.192 5.64 0 11.717.41 6.076.41 14.743.941-28.307 30.136-44.23 70.879-15.923 40.743-15.923 85.845 0 98.334 68.834 167.168 68.834 68.833 167.168 68.833 45.051 0 85.819-15.179 40.769-15.179 70.487-41.998.564 7.589.974 12.922.411 5.333.411 10.563-7.693 133.461-104.808 225.575-97.115 92.115-232.883 92.115Zm0-50.255q98.154 0 173.564-57.834 75.41-57.833 101.462-141.936-22.308 7.975-46.547 12.129-24.24 4.153-48.479 4.153-118.951 0-202.604-83.652Q374.898-541.049 374.898-660q0-22.154 3.948-45.744 3.949-23.589 13-50.769-87.743 29.436-144.089 105.644Q191.41-574.661 191.41-480q0 120.513 84.616 205.128 84.615 84.616 205.128 84.616Zm-7.026-283.129Z'
                }
                fill={theme === 'dark' ? '#ffffff' : '#000000'}
              ></path>
            </svg>
            <svg
              className="cursor-pointer"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 -960 960 960"
              height="20"
              width="20"
              onClick={() => setTheme('light')}
            >
              <path
                d={
                  theme === 'light'
                    ? 'M480-280q-83 0-141.5-58.5T280-480q0-83 58.5-141.5T480-680q83 0 141.5 58.5T680-480q0 83-58.5 141.5T480-280ZM70-450q-12.75 0-21.375-8.675Q40-467.351 40-480.175 40-493 48.625-501.5T70-510h100q12.75 0 21.375 8.675 8.625 8.676 8.625 21.5 0 12.825-8.625 21.325T170-450H70Zm720 0q-12.75 0-21.375-8.675-8.625-8.676-8.625-21.5 0-12.825 8.625-21.325T790-510h100q12.75 0 21.375 8.675 8.625 8.676 8.625 21.5 0 12.825-8.625 21.325T890-450H790ZM479.825-760Q467-760 458.5-768.625T450-790v-100q0-12.75 8.675-21.375 8.676-8.625 21.5-8.625 12.825 0 21.325 8.625T510-890v100q0 12.75-8.675 21.375-8.676 8.625-21.5 8.625Zm0 720Q467-40 458.5-48.625T450-70v-100q0-12.75 8.675-21.375 8.676-8.625 21.5-8.625 12.825 0 21.325 8.625T510-170v100q0 12.75-8.675 21.375Q492.649-40 479.825-40ZM240-678l-57-56q-9-9-8.629-21.603.37-12.604 8.526-21.5 8.896-8.897 21.5-8.897Q217-786 226-777l56 57q8 9 8 21t-8 20.5q-8 8.5-20.5 8.5t-21.5-8Zm494 495-56-57q-8-9-8-21.375T678.5-282q8.5-9 20.5-9t21 9l57 56q9 9 8.629 21.603-.37 12.604-8.526 21.5-8.896 8.897-21.5 8.897Q743-174 734-183Zm-56-495q-9-9-9-21t9-21l56-57q9-9 21.603-8.629 12.604.37 21.5 8.526 8.897 8.896 8.897 21.5Q786-743 777-734l-57 56q-8 8-20.364 8-12.363 0-21.636-8ZM182.897-182.897q-8.897-8.896-8.897-21.5Q174-217 183-226l57-56q8.8-9 20.9-9 12.1 0 20.709 9Q291-273 291-261t-9 21l-56 57q-9 9-21.603 8.629-12.604-.37-21.5-8.526Z'
                    : 'M480-360q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35Zm0 59.999q-74.922 0-127.461-52.538Q300.001-405.078 300.001-480t52.538-127.461Q405.078-659.999 480-659.999t127.461 52.538Q659.999-554.922 659.999-480t-52.538 127.461Q554.922-300.001 480-300.001Zm-400-150q-12.75 0-21.374-8.628Q50-467.258 50-480.013q0-12.756 8.625-21.371 8.624-8.615 21.374-8.615h90.001q12.749 0 21.374 8.628Q200-492.742 200-479.987q0 12.756-8.625 21.371-8.625 8.615-21.374 8.615H80Zm709.999 0q-12.749 0-21.374-8.628Q760-467.258 760-480.013q0-12.756 8.625-21.371 8.625-8.615 21.374-8.615H880q12.75 0 21.375 8.628 8.624 8.629 8.624 21.384 0 12.756-8.624 21.371-8.625 8.615-21.375 8.615h-90.001ZM479.987-760q-12.756 0-21.371-8.625-8.615-8.625-8.615-21.374V-880q0-12.75 8.628-21.375 8.629-8.624 21.384-8.624 12.756 0 21.371 8.624 8.615 8.625 8.615 21.375v90.001q0 12.749-8.628 21.374Q492.742-760 479.987-760Zm0 710q-12.756 0-21.371-8.626-8.615-8.624-8.615-21.374v-90.001q0-12.749 8.628-21.374Q467.258-200 480.013-200q12.756 0 21.371 8.625 8.615 8.625 8.615 21.374V-80q0 12.75-8.628 21.374Q492.742-50 479.987-50ZM240.232-678.386l-50.308-48.923q-8.923-8.308-8.616-20.884.308-12.577 8.733-21.884 9.19-9.308 21.574-9.308 12.385 0 21.077 9.308L282-720.153q8.692 9.308 8.692 21.077 0 11.769-8.5 21.076-8.499 9.307-20.576 8.807t-21.384-9.192Zm487.076 488.461L678-239.847q-8.692-9.308-8.692-21.384 0-12.077 8.692-20.769 8.115-9.307 20.288-8.807t21.48 9.192l50.308 48.923q8.923 8.308 8.616 20.884-.308 12.577-8.733 21.884-9.19 9.308-21.574 9.308-12.385 0-21.077-9.308ZM678-677.808q-9.307-8.499-8.807-20.576t9.192-21.384l48.923-50.308q8.308-8.923 20.884-8.616 12.577.308 21.884 8.733 9.308 9.19 9.308 21.574 0 12.385-9.308 21.077L720.153-678q-9.308 8.692-21.077 8.692-11.769 0-21.076-8.5ZM189.924-189.84q-9.308-9.391-9.308-21.775 0-12.385 9.308-21.077L239.847-282q9.308-8.692 21.384-8.692 12.077 0 20.769 8.692 8.923 8.115 8.423 20.288t-8.808 21.48l-48.923 50.308q-8.692 9.308-21.077 9-12.384-.307-21.691-8.916ZM480-480Z'
                }
                fill={theme === 'dark' ? '#fff' : '#000'}
              ></path>
            </svg>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
