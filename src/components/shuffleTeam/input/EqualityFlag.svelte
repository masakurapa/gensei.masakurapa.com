<InputGroup>
    <InputCheckbox
        value={$equalityFlag}
        label="人数を均等に分ける"
        on:change={(event) => { equalityFlag.set(event.detail) }}
    ></InputCheckbox>
</InputGroup>

<script lang="ts">
    import { equalityFlag } from '../store';

    import InputCheckbox from '../../../parts/input/InputCheckbox.svelte';
    import InputGroup from '../../../parts/input/InputGroup.svelte';
</script>
