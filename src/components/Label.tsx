import { ics } from "calendar-link";
import "../styles/label.scss";
import calendarImage from '../../public/calender.svg';
import HappyImage from '../../public/happy.svg';
import { ConvertDate } from "./ConvertDate";
import { GetICS } from "./GetICS";

interface LabelProps {
    post: any;
}

const calculateRemainingDays = (Datum: string) => {
	const targetDate = ConvertDate(Datum);
	const currentDate = new Date();
	const timeDifference = targetDate.valueOf() - currentDate.valueOf();
	const daysRemaining = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
	return daysRemaining < 0 ? -1 : daysRemaining;
};

export default function Label({ post }: LabelProps) {

    const remain = calculateRemainingDays(post.data.Datum)

    if (remain > 0) {
        return (
            <div>
                <a href= { GetICS(post.data) } >
                <div
                id="days-remaining"
                        className="slideRight transition-all  shadow-md rounded-l-md p-2 gap-2 flex justify-between items-center z-30 absolute right-0 bottom-5"
                >
                <p>In { remain } Tagen!</p>
                    < img
                        src={calendarImage.src}
                        alt = ""
                        className="animate-rotate"
                />
                <p className="hidden transition-all tracking-wider calender-text" >
                    Jetzt merken!
                        </p>
                        </div>
                        </a>
            </div>
        )
    }

    if (remain == 0) {
        return (
            <div>
                <a href= {GetICS({...post}) } >
                <div
                id="days-remaining"
                        className="slideRight transition-all shadow-md rounded-l-md p-2 gap-2 flex justify-between items-center z-30 absolute right-0 bottom-5"
                >
                <p>Heute! </p>
                < img
                        src = {HappyImage.src}
                        alt = ""
                        className="animate-rotate"
                />
                <p className="hidden transition-all tracking-wider calender-text" >
                    Jetzt merken!
                        </p>
                        </div>
                        </a>
            </div>
        )
    }
}