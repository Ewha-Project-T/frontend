import { Empty } from "antd";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { API_URL } from "../../components/Config";
import NavBar from "../../components/views/NavBar/NavBar";
import StudentBreadcrumb from "../../components/views/commons/StudentBreadcrumb";
import Timeformat from "../../components/views/commons/Timeformat";

function ProbListStudentPage() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const lectureNo = params.get("lecture_no");
  let navigate = useNavigate();
  const [Problist, setProblist] = useState([]);
  const [lectureName, setLectureName] = useState("");

  const onDetailPageMove = (as_no) => {
    navigate(`/prob/detail/student?as_no=${as_no}&lecture_no=${lectureNo}`);
  };

  useEffect(() => {
    Axios.get(`${API_URL}api/prob/student?lecture_no=${lectureNo}`, {
      withCredentials: true,
    })
      .then((response) => {
        // 요청이 성공한 경우의 처리

        setLectureName(response.data.lecture_name);
        setProblist(response.data.prob_list);
      })
      .catch((error) => {
        // 요청이 실패한 경우의 처리
        console.error(error);
        navigate("/");
      });
  }, []);

  return (
    <div>
      <NavBar />
      <StudentBreadcrumb LectureName={lectureName} />
      <div style={{ display: "flex" }}>
        <LectureBackDiv>
          <Link to={`/`} style={{ color: "black", padding: "7px" }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 -5 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75"
              />
            </svg>
          </Link>
        </LectureBackDiv>
        <LectureTitleDiv>과제 목록 : {lectureName}</LectureTitleDiv>
      </div>
      {Problist?.length === 0 ? (
        <NoDataDiv>
          <Empty />
        </NoDataDiv>
      ) : (
        <div className="flex flex-col">
          <div className="overflow-x-hidden">
            <div className="p-1.5 w-full inline-block align-middle">
              <div className="overflow-auto border rounded-lg">
                <table className="min-w-full divide-y divide-gray-200 overflow-x-auto border-collapse">
                  <thead className="bg-gray-50 overflow-x-auto">
                    <tr>
                      <th
                        scope="col"
                        className="flex items-center px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                      >
                        No
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={1}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M17 13l-5 5m0 0l-5-5m5 5V6"
                          />
                        </svg>
                      </th>

                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                      >
                        <span className="inline-flex items-center">
                          제목
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-4 h-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M17 13l-5 5m0 0l-5-5m5 5V6"
                            />
                          </svg>
                        </span>
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "
                      >
                        최종 제출
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "
                      >
                        교수 평가
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-center text-gray-500 uppercase "
                      >
                        마감일
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {Problist?.map((assignment, index) => {
                      return (
                        <React.Fragment key={index}>
                          <tr
                            onClick={() => onDetailPageMove(assignment.as_no)}
                            className="cursor-pointer border-solid border-2 border-gray-200"
                          >
                            <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                              {index + 1}
                            </td>

                            <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                              {assignment.as_name}
                            </td>
                            <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                              {assignment.end_submission ? (
                                <AiOutlineCheck
                                  size="18"
                                  style={{ color: "green" }}
                                />
                              ) : (
                                <AiOutlineClose
                                  size="18"
                                  style={{ color: "red" }}
                                />
                              )}
                            </td>
                            <td
                              className="px-6 py-4 text-sm font-medium float-right text-right whitespace-nowrap"
                              style={{ fontSize: "13px" }}
                            >
                              {assignment.professor_review ? (
                                <AiOutlineCheck
                                  size="18"
                                  style={{ color: "green" }}
                                />
                              ) : (
                                <AiOutlineClose
                                  size="18"
                                  style={{ color: "red" }}
                                />
                              )}
                            </td>
                            <td
                              className="px-6 py-4 text-sm font-medium text-center whitespace-nowrap mx-auto"
                              style={{ fontSize: "13px" }}
                            >
                              <Timeformat dateString={assignment.limit_time} />
                            </td>
                          </tr>
                        </React.Fragment>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProbListStudentPage;

const StyledLink = styled(Link)`
  text-decoration: none; /* 기본 밑줄 제거 */
  /* 원하는 스타일을 추가하세요 */
  color: #333; /* 텍스트 색상 */

  /* 추가 스타일 속성들... */
`;
const LectureBackDiv = styled.div`
  background-color: #85889914;
  border-radius: 7px;
  margin: 20px;
  height: 34px;
  width: 40px;
  color: black;
`;

const LectureTitleDiv = styled.div`
  font-size: 1.4rem;
  line-height: 1.5;
  color: #2b2d36;
  font-weight: 700;
  margin-top: 17px;
`;
const NoDataDiv = styled.div`
  margin-top: 25%;
`;
