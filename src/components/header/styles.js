import styled from 'styled-components';
import { Link } from 'react-router-dom'

export const Container = styled.header`
    grid-area: header;

    height: 105px;
    width: 100%;

    border-bottom: 1px solid ${({ theme }) => theme.COLORS.BACKGROUND_700};

    display: flex;
    justify-content: space-between;

    padding: 0 80px;
`;

export const Profile = styled(Link)`
    display: flex;
    align-items: center;

    > img {
        width: 56px;
        border-radius:  50%;
    }
    > div {
        display: flex;
        flex-direction: column;
        margin-left: 16px;
        line-height: 24px;
    
        span {
            font-size: 14px;
            color: ${({ theme }) => theme.COLORS.GRAY_100};

        }
        strong {
            font-size: 14px;
            color: ${({ theme }) => theme.COLORS.WHITE};

        }
    }
`;

export const Logout = styled.button`
    border: 0;
    background: 0;

    > svg{
        color: ${({ theme }) => theme.COLORS.GRAY_100};
        font-size: 26px;
    }
`;
