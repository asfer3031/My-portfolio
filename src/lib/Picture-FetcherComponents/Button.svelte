<script>
    export let type = 'primary';
    export let flat = false;
    </script>
    
    
    
    <button class={type} class:flat={flat} on:click>
        <slot></slot>
    </button>
    
    
    
    <style>
        button{
            border: 0;
            cursor: pointer;
            border-radius: 6px;
            padding: 8px 12px;
            font-weight: bold;
            box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.2);
        }
        
    
        .primary{
        background-color: #ff0080;
        color: white;
    
        }
    
        .secondary{
            background-color: #45c496;
            color: white;
        }
    
        .flat{
            box-shadow: none;
        }
    
        .primary.inverse{
            color: #ff0080;
            background-color: white;
            border: 2px solid #ff0080;
        }
    
        .secondary.inverse{
            color: #45c496;
            background-color: white;
            border: 2px solid #45c496;
        }
    
        
    
    </style>