import classNames from 'classnames'
import Tag from '../models/Tag'

const Tag = ({ tag }: { tag: Tag }) => {
	return (
		<p
			className={classNames(
				'text-[11px]',
				'px-1',
				'py-0',
				'leading-normal',
				'rounded-sm',
				'shrink',
				'w-fit',
				'mb-0.5',
				tag.color
			)}>
			{tag.name}
		</p>
	)
}

export default Tag
