import { Card } from '@/components/ui/card';
import { SelectedStock } from '@/components/searchbar';


export interface RecentProps {
    recentList: SelectedStock[];
    onRecentSelected: (stock: SelectedStock) => void;
}


const Recent: React.FC<RecentProps> = (props) => {


    const truncate = (title: string) => {
        return title.length > 50? <>{title.substring(0,50)}&hellip;</> : title;
    };

    return (
        <div className="flex flex-col justify-center items-center cursor-pointer ">
            {props.recentList.map((item, key) => {
                return (<
                    Card onClick={() => props.onRecentSelected({ id: item.id, name: item.name, title: item.title })}
                         key={key}
                         className="flex flex-col w-5/6 mt-1 mb-2 bg-light-gold p-2  justify-between font-medium text-[#EDEDED] bg-opacity-60 ">
                    <div>{item.name}</div>
                    <div className="text-[#E8A44D] text-sm font-bold text-[#E8A44D] ">{truncate(item.title)}</div>
                </Card>);
            })}

        </div>
    );
};

export default Recent;