import { Card } from '@/components/ui/card';
import { SelectedStock } from '@/components/new-search';



export interface RecentProps {
    recentList: SelectedStock[];
}


const Recent: React.FC<RecentProps> = (props) => {
    return (
        <div className="flex flex-col justify-center items-center cursor-pointer">
            {props.recentList.map((item, key) => {
                return (<Card key={key}
                              className="flex flex-row w-5/6 mt-2 h-[40px] bg-[#987C44] p-2 justify-between font-medium text-[#EDEDED] bg-opacity-60 ">
                    <div>{item.name}</div>
                    <div className="text-green-900 font-bold text-[#E8A44D]">{item.title}</div>
                </Card>);
            })}

        </div>
    );
};

export default Recent;