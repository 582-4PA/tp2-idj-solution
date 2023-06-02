import './Vote.scss';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import { IconButton } from '@mui/material';

export default function Vote({down, up, voteActuel, changerVote}) {

  return (
    <div className="Vote">
      <IconButton className='btn-vote up' onClick={()=>changerVote(1, voteActuel)} size='small'>
          <span className="decompte">{up}</span>
          {voteActuel === 1 ? <ThumbUpAltIcon /> : <ThumbUpOffAltIcon />}
      </IconButton>
      <IconButton className='btn-vote down' onClick={()=>changerVote(-1, voteActuel)} size='small'>
          <span className="decompte">{down}</span>
          {voteActuel === -1 ? <ThumbDownAltIcon /> : <ThumbDownOffAltIcon />}
      </IconButton>
    </div>
  );
}