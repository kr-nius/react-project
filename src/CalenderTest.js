import React, { useState } from "react";
import { format, addMonths, subMonths } from "date-fns";
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek } from "date-fns";
import { isSameMonth, isSameDay, addDays } from "date-fns";
import "./_diary.scss";
import Modal from "./Modal";

// header 타이틀, 월 부분
const RenderHeader = ({ currentMonth, prevMonth, nextMonth }) => {
  return (
    <div className="header row">
      <span className="text">{format(currentMonth, "yyyy")}년 길동의 기록</span>
      <div className="col">
        <span className="text-month">
          {" "}
          <div className="icon" onClick={prevMonth}>
            ◀
          </div>
          {format(currentMonth, "M")}월{" "}
          <div className="icon" onClick={nextMonth}>
            ▶
          </div>
        </span>
      </div>
    </div>
  );
};

// ---------------------------------------------------------------------------------------------------
// 요일 표시 부분
const RenderDays = () => {
  const days = [];
  const date = ["일", "월", "화", "수", "목", "금", "토"];

  for (let i = 0; i < 7; i++) {
    days.push(
      <div className="col" key={i}>
        {date[i]}
      </div>
    );
  }

  return <div className="days row">{days}</div>;
};

// ---------------------------------------------------------------------------------------------------
// 날짜 표시 부분
const RenderCells = ({ currentMonth, selectedDate }) => {
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const rows = [];
  let days = [];
  let day = startDate;
  let formattedDate = "";

  // ---------------------------모달
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [choiceDate, setChoiceDate] = useState("");

  const handleCellClick = (clickedDate) => {
    // 클릭한 날짜를 콘솔에 출력
    console.log("클릭한 날짜:", clickedDate);
    setChoiceDate(format(clickedDate, "yyyy년 MM월 dd일"));
    console.log("choiceDate: ", choiceDate);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      formattedDate = format(day, "d");
      const cloneDay = day;
      days.push(
        <div
          className={`col cell ${
            !isSameMonth(day, monthStart)
              ? "disabled"
              : isSameDay(day, selectedDate)
              ? "selected"
              : format(currentMonth, "M") !== format(day, "M")
              ? "not-valid"
              : "valid"
          }`}
          key={day}
          onClick={() => {
            openModal();
            handleCellClick(cloneDay);
          }}
        >
          <span
            className={
              format(currentMonth, "M") !== format(day, "M")
                ? "text not-valid"
                : ""
            }
          >
            {formattedDate}
          </span>
        </div>
      );
      day = addDays(day, 1);
    }
    rows.push(
      <div className="row" key={day}>
        {days}
      </div>
    );
    days = [];
  }

  return (
    <>
      <div className="body">{rows}</div>
      <Modal isOpen={isModalOpen} onClose={closeModal} clickDate={choiceDate} />
    </>
  );
};

export const CalenderTest = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };
  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  return (
    <div className="calendar">
      <RenderHeader
        currentMonth={currentMonth}
        prevMonth={prevMonth}
        nextMonth={nextMonth}
      />
      <RenderDays />
      <RenderCells currentMonth={currentMonth} selectedDate={selectedDate} />
    </div>
  );
};
