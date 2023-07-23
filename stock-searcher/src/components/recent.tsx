import { Card } from '@/components/ui/card';
import { SelectedStock } from '@/components/new-search';


export interface RecentProps {
    recentList: SelectedStock[];
    onRecentSelected: (stock: SelectedStock) => void;
}


const Recent: React.FC<RecentProps> = (props) => {


    const truncate = (title: string) => {
        return title.length > 15 ? <>{title.substring(0, 15)}&hellip;</> : title;
    };

    return (
        <div className="flex flex-col justify-center items-center cursor-pointer ">
            {props.recentList.map((item, key) => {
                return (<
                    Card onClick={() => props.onRecentSelected({ id: item.id, name: item.name, title: item.title })}
                         key={key}
                         className="flex flex-row w-5/6 mt-2 h-[40px] bg-[#987C44] p-2 justify-between font-medium text-[#EDEDED] bg-opacity-60 ">
                    <div>{item.name}</div>
                    <div className="text-[#E8A44D] font-bold text-[#E8A44D] text-sm">{truncate(item.title)}</div>
                </Card>);
            })}

        </div>
    );
};

export default Recent;