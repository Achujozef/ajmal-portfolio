import React, { useState, useEffect } from 'react';
// import AOS from 'aos';
import 'aos/dist/aos.css';
import { Link } from 'react-router-dom';
import { IoMdClose } from "react-icons/io";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Chip,
  Button,
} from '@material-tailwind/react';
import {
  useMaterialTailwindController
} from "../../../context/index";
import { fetchTrainers } from "../../../actions/TrainerActions";

export const TrainersList = () => {
  const [trainersList, setTrainersList] = useState(null);

  useEffect(() => {
    const fetchTrainersList = async () => {
      try {
        const response = await fetchTrainers();
        setTrainersList(response);
        console.log("const [trainersList, setTrainersList] = useState(null);", response);
      } catch (error) {
        console.error('Failed to fetch trainersList', error);
      }
    };
    fetchTrainersList();
  }, []);

  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavType } = controller;
console.log(dispatch);
  return (
    <>
      <div className="w-full h-[1100px] overflow-scroll">
        <div className={`mt-12 mb-8 flex flex-col gap-12 rounded-xl ${
          sidenavType === "dark" ? "bg-transparent border-x border-y border-gray-800" : "bg-white"
        }`} data-aos="fade-up"
          data-aos-duration="700">
          <Card className={`${sidenavType === 'dark' ? "bg-gray-900 bg-opacity-90" : "bg-white"}`}>
            <CardHeader variant="filled" color="gray" className={`mb-8 p-6 ${sidenavType === 'dark' ? "bg-gray-900 border-x border-y border-gray-800" : "bg-gray-900"}`}>
              <Typography variant="h6" color="white">
                All Trainers
              </Typography>
              <Link to="/dashboard/home" className='w-full'>
                <IoMdClose className='w-8 h-8 absolute right-7 top-7 bg-gray-700 rounded-full p-[5px] text-gray-900 hover:bg-gray-500' />
              </Link>
            </CardHeader>
            <CardBody className={`overflow-x-scroll px-0 pt-0 pb-2 ${sidenavType === 'dark' ? "bg-gray-900 bg-opacity-40" : "bg-white"}`}>
              <div className='w-full flex justify-between items-center pr-6'>
                <Link to='/dashboard/Home'>
                  <Button variant="filled" className={`ml-6 ${sidenavType === 'dark' ? "bg-gray-800" : "bg-blue-gray-800"}`}>Back</Button>
                </Link>
                <div></div>
                <Link to='/dashboard/AddTrainer'>
                  <Button size='sm' className={`py-3 ${sidenavType === 'dark' ? "bg-red-700" : "bg-black"}`}>Add A Trainer</Button>
                </Link>
              </div>
              <table className="w-full min-w-[640px] table-auto mt-3">
                <thead className={`bg-opacity-30 ${sidenavType === 'dark' ? "bg-gray-800" : "bg-blue-gray-400"}`}>
                  <tr>
                    {[
                      'Member',
                      'Job',
                      'Status',
                      'Contact',
                      '',
                    ].map(el => (
                      <th
                        key={el}
                        className={`py-3 px-5 text-left ${sidenavType === 'dark' ? "border-b border-gray-900" : "border-b border-blue-50"}`}
                      >
                        <Typography
                          variant="small"
                          className="text-[11px] font-bold uppercase text-blue-gray-400"
                        >
                          {el}
                        </Typography>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {trainersList && trainersList.map(
                    ({ profile_picture, user, email, areas_of_expertise, certification_level, contact_number }, key) => {
                      const className = `py-3 px-5 ${key === trainersList.length - 1 ? '' : (sidenavType === 'dark' ? 'border-b border-gray-900' : 'border-b border-red-50')}`;

                      return (
                        <tr key={user.first_name}>
                          <td className={className}>
                            <div className="flex items-center gap-4">
                              <Avatar
                                src={profile_picture}
                                alt={user.first_name}
                                size="sm"
                                variant="rounded"
                              />
                              <div>
                                <Typography
                                  variant="small"
                                  color={sidenavType === 'dark' ? "white" : "blue-gray"}
                                  className="font-semibold"
                                >
                                  {user.first_name}
                                </Typography>
                                <Typography className="text-xs font-normal text-blue-gray-500">
                                  {email}
                                </Typography>
                              </div>
                            </div>
                          </td>
                          <td className={className}>
                            <Typography className={`text-xs font-semibold ${
                              sidenavType === "dark" ? "text-white" : "text-blue-gray-600"
                            }`}>
                              {areas_of_expertise}
                            </Typography>
                            <Typography className="text-xs font-normal text-blue-gray-500">
                              {certification_level}
                            </Typography>
                          </td>
                          <td className={className}>
                            <Chip
                              variant="gradient"
                              color='green'
                              value='active'
                              className="py-0.5 px-2 text-[11px] font-medium w-fit rounded-sm"
                            />
                          </td>
                          <td className={className}>
                            <Typography className={`text-xs font-semibold ${
                              sidenavType === "dark" ? "text-white" : "text-blue-gray-600"
                            }`}>
                              {contact_number}
                            </Typography>
                          </td>
                          <td className={className}>
                            <Typography
                              as="a"
                              href="#"
                              className={`text-xs font-semibold ${
                                sidenavType === "dark" ? "text-white" : "text-blue-gray-600"
                              }`}
                            >
                              Edit
                            </Typography>
                          </td>
                        </tr>
                      );
                    }
                  )}
                </tbody>
              </table>
            </CardBody>
          </Card>
        </div>
      </div>
    </>
  )
}

export default TrainersList;