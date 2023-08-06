import { useState, useRef } from 'react'

function App() {
  const dayRef = useRef(null)
  const monthRef = useRef(null)
  const yearRef = useRef(null)

  const [day, setDay] = useState(null)
  const [month, setMonth] = useState(null)
  const [year, setYear] = useState(null)

  const [dayError, setDayError] = useState(false)
  const [monthError, setMonthError] = useState(false)
  const [yearError, setYearError] = useState(false)

  const daysInMonth = (y, m) => {
    return new Date(y, m, 0).getDate();
  }

  const validateDate = (d, m, y) => {
    const date = new Date()
    const currentYear = date.getFullYear()
    const currentMonth = (date.getMonth() + 1)
    const currentDay = date.getDate()

    if (y > currentYear) {
      setYearError(true)
      return false
    }

    if (m > 12) {
      setMonthError(true)
      return false
    }

    if (y === currentYear && m > currentMonth) {
      setMonthError(true)
      return false
    }

    if (y === currentYear && m === currentMonth && d > currentDay) {
      setDayError(true)
      return false
    }

    if (d > daysInMonth(y, m)) {
      setDayError(true)
      return false
    }

    setYearError(false)
    setMonthError(false)
    setDayError(false)

    return true
  }

  const calculateAge = (d, m, y) => {
    const date = new Date()
    const currentYear = date.getFullYear()
    const currentMonth = (date.getMonth() + 1)
    const currentDay = date.getDay()
    let dayAge = 0, monthAge = 0, yearAge = 0

    // Year Calc
    yearAge = currentYear - y

    // Month Calc & Year Update
    if (currentMonth >= m) {
      monthAge = currentMonth - m
    } else {
      yearAge--
      monthAge = 12 + currentMonth - m
    }

    // Day Calc & Month, Year Update
    if (currentDay >= d) {
      dayAge = currentDay - d
    } else {
      monthAge--
      dayAge = (daysInMonth(yearAge, monthAge)) + currentMonth - m
      if (monthAge < 0) {
        monthAge = 11
        yearAge--
      }
    }


    return {
      dobDay: dayAge,
      dobMonth: monthAge,
      dobYear: yearAge
    }

  }

  const setAge = () => {
    const d = parseInt(dayRef.current.value)
    const m = parseInt(monthRef.current.value)
    const y = parseInt(yearRef.current.value)

    if(!d || !m || !y) {
      setYearError(true)
      setMonthError(true)
      setDayError(true)
      return false
    }

    if ( validateDate(d, m ,y) ) {
      const { dobDay, dobMonth, dobYear } = calculateAge(d, m, y)

      setDay(dobDay);
      setMonth(dobMonth);
      setYear(dobYear);
    }
  }

  return (
    <div className="bg-neutral-white p-6 lg:p-10 rounded-4xl rounded-br-10xl w-full m-6 lg:w-1/2 lg:m-0">
      <div className="relative grid grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-6 border-b border-neutral-lightGrey pb-12 lg:pb-8 mb-12 lg:mb-8">
        <div className="flex flex-col gap-2">
          <label htmlFor="day" className={`text-xs ${ dayError ? 'text-primary-lightRed' : 'text-neutral-smokeyGrey'}`}>DAY</label>
          <input ref={dayRef} type="number" id="day" className="border border-neutral-lightGrey p-3 rounded-lg" placeholder="DD" />
          {dayError && <p className="text-primary-lightRed italic text-xs">Must be a valid day</p>}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="month" className={`text-xs ${ monthError ? 'text-primary-lightRed' : 'text-neutral-smokeyGrey'}`}>MONTH</label>
          <input ref={monthRef} type="number" id="month" className="border border-neutral-lightGrey p-3 rounded-lg" placeholder="MM" />
          {monthError && <p className="text-primary-lightRed italic text-xs">Must be a valid month</p>}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="year" className={`text-xs ${ yearError ? 'text-primary-lightRed' : 'text-neutral-smokeyGrey'}`}>YEAR</label>
          <input ref={yearRef} type="number" id="year" className="border border-neutral-lightGrey p-3 rounded-lg" placeholder="YYYY" />
          {yearError && <p className="text-primary-lightRed italic text-xs">Must be a valid year</p>}
        </div>
        <button className="w-16 lg:w-24 h-16 lg:h-24 absolute right-0 left-0 mx-auto lg:mx-0 lg:left-auto -bottom-8 lg:-bottom-12 bg-primary-purple flex justify-center items-center rounded-full" onClick={setAge}>
          <svg xmlns="http://www.w3.org/2000/svg" width="46" height="44" viewBox="0 0 46 44">
            <g fill="none" stroke="#FFF" strokeWidth="2">
              <path d="M1 22.019C8.333 21.686 23 25.616 23 44M23 44V0M45 22.019C37.667 21.686 23 25.616 23 44"/>
            </g>
          </svg>
        </button>
      </div>
      <div className="flex flex-col text-4xl lg:text-8xl gap-4 font-extrabold italic my-10">
        <div className="flex gap-8">
          <span className="text-primary-purple">{year ? year : '--'}</span>
          <span>years</span>
        </div>
        <div className="flex gap-8">
          <span className="text-primary-purple">{month ? month : '--'}</span>
          <span>months</span>
        </div>
        <div className="flex gap-8">
          <span className="text-primary-purple">{day ? day : '--'}</span>
          <span>days</span>
        </div>
      </div>
    </div>
  )
}

export default App
