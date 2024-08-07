import classNames from "classnames";
import React from "react";
import ReactApexChart from "react-apexcharts";
import { useNavigate } from "react-router-dom";
import theme from "../../../../style/theme/theme";
import "./Schedule.css";
import ScheduleDateBoxInfo from "./ScheduleDateBoxInfo";

// 메인페이지 - 일자별 일정 박스
function ProfessorScheduleDateBox({
  isLast,
  asId,
  lectureId,
  name,
  type,
  startDate,
  endDate,
  studentCount,
  doneCount,
}) {
  const navigate = useNavigate();
  const options = {
    chart: {
      height: 10,
      type: "radialBar",
    },

    colors: ["#AFEDC8"],

    plotOptions: {
      radialBar: {
        track: {
          strokeWidth: "100%", // 그래프의 두께를 넓게 설정합니다.
        },
        hollow: {
          margin: 5,
          size: "25%",
        },
        dataLabels: {
          showOn: "always",
          name: {
            show: false, // 이름 레이블을 숨깁니다.
          },
          value: {
            color: "#70CD95",
            fontSize: "12px",
            fontWeight: 800,
            show: true,
            offsetY: 5, // Y축 위치를 중앙으로 설정합니다.
            offsetX: 0, // X축 위치를 중앙으로 설정합니다.
          },
        },
      },
    },

    stroke: {
      lineCap: "round",
    },
    labels: [""],
  };

  const series = [Math.floor((doneCount / studentCount) * 100)];

  const colors = [theme.colors.MainColor];

  return (
    <div
      className="scheduleDateBox"
      onClick={() =>
        navigate(`/prob/detail/professor?as_no=${asId}&lecture_no=${lectureId}`)
      }
    >
      <div className="scheduleDateBox-box">
        <div className="scheduleDateBox-box__line">
          <span className="scheduleDateBox__line__circle__item"></span>
          {/* <div className="scheduleDateBox__line__circle">
          </div> */}
          <span
            className={classNames("scheduleDateBox__line", { last: isLast })}
          ></span>
        </div>
        <div className="scheduleDateBox-info">
          <ScheduleDateBoxInfo
            name={name}
            type={type}
            startDate={startDate}
            endDate={endDate}
          />
          <span className="scheduleDateBox-info__complete">
            <span>{studentCount}</span>명 중 <span>{doneCount}</span>명 제출
            완료
          </span>
        </div>
      </div>
      <div className="scheduleDateBox-chart">
        <ReactApexChart
          options={options}
          series={series}
          colors={colors}
          type="radialBar"
          height={150}
          width={160}
          style={{minHeight:"100px"}}
        />
      </div>
    </div>
  );
}

export default ProfessorScheduleDateBox;
